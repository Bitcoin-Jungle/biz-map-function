const Firestore = require('@google-cloud/firestore')
const PROJECTID = 'bitcoin-jungle-maps'
const COLLECTION_NAME = 'locations'

const firestore = new Firestore({
  projectId: PROJECTID,
})

/**
* Retrieve or store a method in Firestore
*
* Responds to any HTTP request.
*
* GET = retrieve
* POST = store (no update)
*
* success: returns the document content in JSON format & status=200
*    else: returns an error:<string> & status=404
*
* @param {!express:Request} req HTTP request context.
* @param {!express:Response} res HTTP response context.
*/
exports.main = async (req, res) => {
  const locationsRef = firestore.collection(COLLECTION_NAME)
  const snapshot = await locationsRef.where('approved', '==', true).get()

  let output = []

  snapshot.forEach(doc => {
   let data = doc.data()
   data.id = doc.id

   output.push(data)
  })

  return res.status(200).send(output)
}