import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import './index.css'
import HomeItem from '../HomeItem'

const statusConstants = {
  initial: 'INITIAL',
  fail: 'FAIL',
  success: 'SUCCESS',
  inprogress: 'INPROGRESS',
}

class Home extends Component {
  state = {dataList: [], isLoad: true, apiStatus: statusConstants.initial}

  componentDidMount() {
    this.getData()
  }

  loader = () => (
    <div data-testid="loader">
      <Loader type="Dote" color="blue" height={80} width={50} />
    </div>
  )

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

  homeList = () => {
    const {dataList, isLoad} = this.state
    console.log('dataList')
    console.log(dataList)
    return (
      <div>
        {isLoad && this.loader()}

        <div>
          <ul>
            {dataList.map(each => (
              <HomeItem item={each} key={each.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  getData = async () => {
    const url = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.courses.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logo_url,
      }))
      this.setState({
        dataList: updatedData,
        isLoad: false,
        apiStatus: statusConstants.success,
      })
    } else {
      this.setState({apiStatus: statusConstants.fail})
    }
  }

  getResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'INPROGRESS':
        return this.loader()
      case 'FAIL':
        return this.failView()
      case 'SUCCESS':
        return this.homeList()
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
export default Home
