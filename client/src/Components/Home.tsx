import { useNavigate } from "react-router-dom"
import { Button } from 'semantic-ui-react'
import '../styles.css'

function Home(){

  //renders home
    const navigate = useNavigate()
    
    return(
      <div className="body-home">
        <div className="img-container">
          <img  alt="logo" src="./src/assets/Logo.png"/>
        </div>
        <div className="Homepage">
          <h2 className="About">Welcome to My Landscaper</h2>
          <p className="About">
            At My Landscaper, we bridge the gap between homeowners and professional landscapers. Our platform empowers you to plan and create stunning landscape projects with ease.
          </p>
          <h3 className="About">Create and Plan</h3>
          <p className="About">
            Whether you're working on a current project or planning for the future, My Landscaper allows you to design your dream landscape. Browse through our extensive plant database to select the perfect greenery for your space.
          </p>
          <h3 className="About">Connect with Professionals</h3>
          <p className="About">
            Once you create a project, a unique code will be generated for you to share with any landscape company. They can view your plant selections and seamlessly incorporate them into their designs, ensuring your vision becomes a reality.
          </p>
          <h3 className="About">Always Growing</h3>
          <p className="About">
            Our plant database is continually expanding, and we're constantly developing new features to make your landscaping experience even better. Stay tuned for updates and innovations from My Landscaper.
          </p>
          <h4 className="About">Sign up today and start creating the landscape you've always dreamed of!</h4>
          <div className="Button">
            <Button color='green' onClick={() => navigate("/Login_user")}>
              Home Owner or just browsing? Click here.
            </Button>
            <Button color='green' onClick={() => navigate("/Login_landscaper")}>
              Landscape Company? Click here.
            </Button>
          </div>
        </div>
      </div>
    )
}

export default Home