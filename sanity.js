import sanityClient from '@sanity/client'

export default sanityClient({ 
   projectId : 'wkn7yq4q',
   dataset: 'production',
   apiVersion:'2019-01-29',
   useCdn: true
})