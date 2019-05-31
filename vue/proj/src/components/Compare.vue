//Still trying to query the data in the collections

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
export default {
  data(){
    return{
      date: null,
      location: null,
      feedback: null,
      slug: null
    }
  },
  methods: {

  comparison(){
    let ref = db.collection('smoothies').where('location', '==', this.$route.params.smoothie_location)
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.smoothie = doc.data()
        this.smoothie.id = doc.id
      })
    })
  }
}
</script>
