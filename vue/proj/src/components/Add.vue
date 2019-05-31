<template>
  <div class="add-s container z-depth-1">
    <h2 class="center-align indigo-text">Add New Job Request</h2>
    <form @submit.prevent="addSmoothie">
      <div class="field title">
        <label for="title">Job Title</label>
        <input type="text" name="title" v-model="title">
      </div>

      <div class="field-email">
        <label for="email">Email</label>
        <input type="text" name="email" v-model="email">
      </div>

      <div class="field-date">
        <label for="date">Date</label>
        <input type="date" name="date" v-model="date">
      </div>

      <div v-for="(ing, index) in locations" class="field location" :key="index">
        <label for="location">location:</label>
        <input type="text" name="location" v-model="locations[index]">
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>

      <div class="field add-location">
       <label for="add-location">Location Of Choice (press tab at least once to proceed):</label>
       <input type="text" name="add-location" @keydown.tab.prevent="addIng" v-model="another">
     </div>

      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Submit Job Request</button>
      </div>

        <ul class="collection">
        <li class="collection-item">Petaling Jaya</li>
        <li class="collection-item">Subang Jaya</li>
        <li class="collection-item">Puchong</li>
        <li class="collection-item">Mont Kiara</li>
        <li class="collection-item">Bukit Jalil</li>
        <li class="collection-item">Kepong</li>
        <li class="collection-item">Shah Alam</li>
        <li class="collection-item">Cheras</li>
        <li class="collection-item">Sentul</li>
        <li class="collection-item">Setiawangsa</li>
      </ul>

    </form>
  </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
  name: 'Add',
  data(){
    return{
      title: null,
      email: [],
      date: null,
      another:null,
      locations: [],
      feedback: null,
      slug: null
    }
  },
  methods: {

  created(){
    // fetch data from firestore
    db.collection('smoothies').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let smoothie = doc.data()
        smoothie.id = doc.id
        this.smoothies.push(smoothie)
      })
    })
  },
    addSmoothie(){
      if(this.title){
        this.feedback = null
        // create a slug
        this.slug = slugify(this.title, {
          replacement: '-',

          lower: true
        })
        //save data to firestore
        db.collection('smoothies').add({
          title: this.title,
          email: this.email,
          date: this.date,
          locations: this.locations,
          slug: this.slug
        }).then(() => {
          this.$router.push({ name: 'Thanks' })
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.feedback = 'You must enter a correct input'
      }
    },
    addIng(){
      if(this.another){
        this.locations.push(this.another)
        this.another = null
        this.feedback = null
      } else {
        this.feedback = 'You must enter a Location'
      }
    },
    deleteIng(ing){
      this.locations = this.locations.filter(location => {
        return location != ing
      })
    }
  }
}

</script>

<style>
.add-s{
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.add-s h2{
  font-size: 2em;
  margin: 20px auto;
}
.add-s .field{
  margin: 20px auto;
  position: relative;
}
.add-s .delete{
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
