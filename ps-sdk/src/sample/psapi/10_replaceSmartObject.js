/*
Copyright 2023 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

const awsLib = require('../../lib/awsLib')
const sdk = require('../../../config/config')

main()

async function main() {
  try {
    const client = await sdk.initSDK()

    const input = {
      // href: await awsLib.getSignedUrl('getObject', 'input/input02.psd'), //ex: AWS S3 (s3://<awsConfig.bucketName>/input/input02.psd)
      href: 'https://raw.githubusercontent.com/adobe/adobe-photoshop-api-sdk/main/testfiles/input/input02.psd',
      storage: sdk.psApiLib.Storage.EXTERNAL,
    }

    const options = {
      layers: [
        {
          name: "so1",
          input: {
            // href: await awsLib.getSignedUrl('getObject', 'input/input02.jpg'), //ex: AWS S3 (s3://<awsConfig.bucketName>/input/input02.jpg)
      href: 'https://raw.githubusercontent.com/adobe/adobe-photoshop-api-sdk/main/testfiles/input/input02.jpg',
            storage: sdk.psApiLib.Storage.EXTERNAL
          }
        }
      ]
    }

    const output = {
      href: await awsLib.getSignedUrl('putObject', 'output/test10.png'),
      storage: sdk.psApiLib.Storage.EXTERNAL,
      type: sdk.psApiLib.MimeType.PNG
    }

    const job = await client.replaceSmartObject(input, output, options)
    console.log(`Response: ${JSON.stringify(job,null,2)}\n`)
    console.log(`Output File: ${await awsLib.getSignedUrl('getObject', 'output/test10.png')}\n`)

  } catch (e) {
    console.error(e)
  }
}
