import Story from '../../components/stories/Story'
import Posts from '../../components/posts/Posts'
import './home.scss'
import Share from '../../components/share/Share'

const Home = () => {
  return (
    <div className='home'>
      <Story/>
      <Share/>
      <Posts/>
    </div>

  )
}

export default Home