import React from 'react';
import './App.css';
import temp from './temp.png'
import axios from "axios"
import Loading from './Loading'

function App() {
  const [image, updateImage] = React.useState()
  const [prompt, updatePrompt] = React.useState()
  const [loading, setLoading] = React.useState(false)

  const generate = async query => {
    setLoading(true)
    const result = await axios.get(`https://0040-34-91-119-56.ngrok.io/?query=${query}`)
    setLoading(false)
    updateImage(result.data)
  }

  return (
    <div className="container">
      <div className='left'>
        <div className='header'>
          <h1>ImaginationCanvas</h1>
        </div>

        <div className='prompt-container'>
          <input value={prompt} onChange={e => updatePrompt(e.target.value)} type='text' className='prompt-query' placeholder='Write your imagination...'></input>
          <br></br>
          <button onClick={e => generate(prompt)} className='prompt-generate'>Generate</button>
        </div>

        <div className='info'>
          <span className='type1'>Experience the magic of this Text-to-Image Converter using Stable Diffusion, which opens the world of imagination.</span>
          <br></br>
          <span className='type2'>Transform text into mesmerizing visuals, bringing your ideas to life. Through the power of advanced machine learning, it generates contextually relevant images, catering to a wide range of artistic styles and preferences.</span>
          <br></br>
          <span className='type3'>The heart of this project lies in Stable Diffusion, a cutting-edge deep-learning model that ensures smooth and coherent transformations from text to image.</span>
        </div>
      </div>

      <div className='right'>
        {/* <Loading/> */}
        {loading ? <Loading/> : image ? <img src={`data:image/png;base64,${image}`} alt='Generated'/> : <img src={temp}       alt='Placeholder'/>}
      </div>
    </div>
  );
}

export default App;
