const globby = require('globby');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
const {Storage} = require('@google-cloud/storage');
const admin = require('firebase-admin');
const isGzip = require('is-gzip');
const stringify = require('json-stringify-safe');

const firebaseServiceAccount = require('./secret.json');

const FIREBASE_ROOT = '/contexts-new/' + process.env.SITE;
const BUILD_DIR = path.join(__dirname, 'build');
const BUCKET = 'scvo-assets';
const DESTINATION_DIR = 'test/' + process.env.SITE;

const storage = new Storage({
  projectId: 'scvo-net'
});

const app = admin.initializeApp({
  projectId: 'scvo-net',
  databaseURL: 'https://scvo-net.firebaseio.com',
  credential: admin.credential.cert(firebaseServiceAccount)
});

(async () => {
  await uploadAssets();
  await uploadConfigs();
  process.exit();
})();

async function uploadAssets() {
  const uploadOptions = await getUploadOptions();
  const total = uploadOptions.length;
  let successful = 0;
  let failed = 0;

  console.log('Uploading a grand total of', total, 'assets');

  for (const uploadOption of uploadOptions) {
    let message = '';
    const extraInfo = [];

    if (uploadOption.gzipped) {
      extraInfo.push('gzipped');
    }

    if (extraInfo.length === 0) {
      extraInfo.push('boring');
    }

    try {
      await storage.bucket(BUCKET).upload(uploadOption.path, uploadOption.options);
      successful++;
      message = 'SUCCESS -> ' + uploadOption.options.destination;
      if (!uploadOption.alreadyUploaded && uploadOption.gzipped) {
        const response = await storage.bucket(BUCKET).file(uploadOption.options.destination).setMetadata(uploadOption.options.metaData);
      }
    } catch(err) {
      failed++;
      message = 'FAILED -> ' + uploadOption.options.destination + ':\n' + stringify(err, null, 2);
    }

    const prefix = ['[F:', failed, '+ S:', successful, '=', (failed + successful), '/', total + ']'].join(' ');
    console.log(prefix, '(' + extraInfo.join(', ') + ')',  message);
  }

  console.log('Finished uploading', successful, 'successful assets with', failed, 'failures');
}

async function getUploadOptions() {
  const uploadOptions = [];

  console.log('Preparing all assets for upload (including checking if they need rehosting');

  const configPath = path.join(BUILD_DIR, 'config.json');
  const assetsGlob = path.join(BUILD_DIR, '**/*');
  const assets = globby.sync([assetsGlob, '!' + configPath]);

  for (const asset of assets) {
    try {
      const destination = path.join(DESTINATION_DIR, asset.split(BUILD_DIR)[1]);
      const contentType = mime.lookup(asset) || 'text/plain';
      const gzipped = isGzip(fs.readFileSync(asset));

      const options = {
        destination,
        public: true,
        metaData: {
          contentType
        }
      };

      if (gzipped) {
        options.metaData.contentEncoding = 'gzip';
      }

      uploadOptions.push({ path: asset, gzipped, options });
    } catch(err) {
      console.error('Failed to get options for asset:', asset, err);
    }
  }

  return uploadOptions;
}

async function uploadConfigs() {
  console.log('Uploading site configuration');

  const firebasePath = FIREBASE_ROOT;
  const configPath = path.join(BUILD_DIR, 'config.json');

  try {
    const json = fs.readFileSync(configPath).toString();
    const siteConfig = JSON.parse(json);
    await app.database().ref(firebasePath).set(siteConfig);
    console.log('Successfully uploaded site config to', firebasePath);
  } catch(err) {
    console.error('Failed to upload site config', firebasePath, stringify(err, null, 2));
  }
}