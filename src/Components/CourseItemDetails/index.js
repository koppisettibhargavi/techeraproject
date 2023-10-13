import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {Component} from 'react'

const statusConstants = {
  initial: 'INITIAL',
  fail: 'FAIL',
  success: 'SUCCESS',
  inprogress: 'INPROGRESS',
}

class CourseItemDetails extends Component {
  state = {Details: {}, apiStatus: statusConstants.initial}

  componentDidMount() {
    this.getItemDetails()
  }

  getItemDetails = async () => {
    this.setState({apiStatus: statusConstants.inprogress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const urlData = `https://apis.ccbp.in/te/courses/${id}`
    console.log(urlData)
    const response = await fetch(urlData)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      console.log(updatedData)
      this.setState({Details: updatedData, apiStatus: statusConstants.success})
    } else {
      this.setState({apiStatus: statusConstants.fail})
    }
  }

  loader = () => (
    <div data-testid="loader">
      <Loader type="Dote" color="blue" height={80} width={50} />
    </div>
  )

  retry = () => {
    this.getItemDetails()
  }

  itemView = () => {
    const {Details} = this.state

    const {name, description, imageUrl} = Details
    return (
      <div>
        <h1>{name}</h1>
        <p>{description}</p>
        <img src={imageUrl} alt={name} />
      </div>
    )
  }

  failView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" className={this.retry()}>
        Retry
      </button>
    </div>
  )

  getResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'INPROGRESS':
        return this.loader()
      case 'FAIL':
        return this.failView()
      case 'SUCCESS':
        return this.itemView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
            alt="website logo"
          />
        </Link>
        {this.getResult()}
      </div>
    )
  }
}

export default CourseItemDetails
