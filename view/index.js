import './index.css'
import axios from 'axios';

axios.get('http://localhost:9999/api/getUserInfo')
  .then(res => {
    console.log(res)
  })