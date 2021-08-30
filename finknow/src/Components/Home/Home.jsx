import React from 'react';
import { Carousel,CardDeck,Card,Container,Row,Col,Form,Button,Pagination} from 'react-bootstrap';
import ShowQueries from '../ShowQueries/ShowQuery';
import TopRated from '../TopRated/TopRated';
import {GetAllQuery} from '../../Services/Query_Services'
import './Home.css'
import {Link, Redirect} from 'react-router-dom'
import {GetSearchdata} from '../../Services/SearchQuery'
import {logedin,logedout} from '../../ReduxAction/Action'
import {connect} from 'react-redux';
// user validation
const mapStateToProps=(props)=>{
  return {
    log:props.isvalid,
    username:props.username
  }
}
const mapDispatchToProps=(dispatch)=>{
  return {
    logedin:()=>dispatch(logedin()),
    logedout:()=>dispatch(logedout())
  }
}

class Home extends React.Component {
  constructor() {
    super()
      this.state={allQueries:[],searchquery:"",heading:"All Queries"};
     
    }
    componentDidMount() {
      // calling the services passing the category parameter as "All Query"
      this.getAllQuery("All Query");
      

    }

  
    // Handle user input for search

    handlevent=(e)=>{
      e.preventDefault();
     
      this.setState({
        searchquery:e.target.value
      })
      console.log(this.state.searchquery);
    
    }
    // calling the services for searching
    Searchquery=(e)=>{
     e.preventDefault();
      var data=GetSearchdata(this.state.searchquery)
      data.then(x=>{
       if(x[0].title=="null"){
         alert("Query not found Please Ask a Query")
       }
       else{
        this.setState({
          allQueries:x
        })
      }
      })

    }
    // Calling the services to get all query based on the category
  getAllQuery=(category)=>{
    
    var queries=GetAllQuery(category);
    queries.then(data=>{
      
      this.setState({allQueries:data,heading:category});
     
    })
  
  }
  handlevent=(e)=>{

    console.log(e.target.value);
    this.setState({
      searchquery:e.target.value
    })
    
  }

  Searchquery=(e)=>{
    
   e.preventDefault();
   console.log("hwww");
    var data=GetSearchdata(this.state.searchquery)
    data.then(x=>{
      if(x[0].title=="null")
      {
        alert("Query not exist,please click on ask query");
      }
      else{
        this.setState({
          allQueries:x
        });

      }
     
    })

  }

  render() {
    if(this.props.log==true)
    {
      return <Container fluid className="main-cont">
      <Row>
      <Carousel fade>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src="https://www.iif.com/Portals/0/OpenContent/Files/1026/About-the-IIF-Update.png"
          alt="First slide"
        />
        <Carousel.Caption>
          <h1><b><font color="#009933">F</font></b>in<b><font color="silver">K</font></b>now</h1>
          <p>be confident in finance and get all query resolved here</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src="https://i.pinimg.com/originals/e8/34/ee/e834ee181e99637c0d5ad93d6e29bbc1.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h1><b>Search</b></h1>
          <p>you can search from 1 million queries among different category...</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src="https://www.wallpapertip.com/wmimgs/190-1908289_ultra-hd-travel-hd.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h1><Link  to="/Ask"><b>Ask Query</b></Link></h1>
          <p>if no query matching your requirement,then you can ask here...</p>
        </Carousel.Caption>
      </Carousel.Item>
      </Carousel>
      </Row>
{/* category cards  */}
      <Container>
            <Row>
             <Col className="category-col">
               <Card >
              <Card.Img src="https://images.unsplash.com/photo-1604594849809-dfedbc827105?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80" />
              <Card.Body>
                <Card.Title>Investment</Card.Title>
              
                <Button  className="category-btn" onClick={()=>{this.getAllQuery("Investment")}}>See Queries</Button>
              </Card.Body>
            </Card></Col> 

                  <Col className="category-col"><Card>
              <Card.Img  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"  />
              <Card.Body>
                <Card.Title>Loan</Card.Title>
              
                <Button className="category-btn" onClick={()=>{this.getAllQuery("Loan")}}>See Queries</Button>
              </Card.Body>
            </Card></Col> 
                 <Col className="category-col"><Card >
              <Card.Img  src="https://images.financialexpress.com/2021/04/MUTUAL-FUND.jpg" />
              <Card.Body>
                <Card.Title>Mutual Funds</Card.Title>
              
                <Button className="category-btn" onClick={()=>{this.getAllQuery("Mutual Funds")}}>See Queries</Button>
              </Card.Body>
            </Card></Col>  
                  <Col className="category-col"><Card>
              <Card.Img  src="https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=755&q=80" />
              <Card.Body>
                <Card.Title>Business</Card.Title>
               
                <Button className="category-btn" onClick={()=>{this.getAllQuery("Business")}}>See Queries</Button>
              </Card.Body>
            </Card></Col>  
            </Row>
            </Container> 
            <Row >
{/* mobile search bar               */}
        <Col lg={8} xs={12}  className="main-area ">
            <div className="mobile-search">
                <h4>Search Query</h4>
                <Form >
                <Form.Group controlId="formBasicEmail">
                    
                    <Form.Control type="text"  value={this.state.searchquery} onChange={this.handlevent} placeholder="Enter Title For Search Query" />
                    <Form.Text className="text-muted" >
                    you will get matched queries here.
                    </Form.Text>
                </Form.Group>
                <Button className="search-btn" onClick={this.Searchquery}>
                    Search
                </Button>
            </Form>
                <hr></hr>
            </div>
            <Link onClick={()=>{this.getAllQuery("All Query")}} className="recent-btn"><h2>{this.state.heading}</h2></Link>

{/* main show queries cards             */}
            <ShowQueries allQueries={this.state.allQueries} update={this.getAllQuery} path="home"/>

{/* Pagination */}
            
        </Col>
        <Col lg={4} xs={12} className="side-area" >
            <div className="search-form">
            <h4>Search Query</h4>
              <Form>
                <Form.Group controlId="formBasicEmail">
                    
                    <Form.Control type="text"  value={this.state.searchquery} onChange={this.handlevent} placeholder="Enter Title For Search Query" />
                    <Form.Text className="text-muted" >
                    you will get matched queries here.
                    </Form.Text>
                </Form.Group>
                <Button className="search-btn" onClick={(this.Searchquery)}>
                    Search
                </Button>
            </Form>
            </div>
            <TopRated/>
        </Col>
        
      </Row>

      </Container>

  }
  else
  {
    return <Redirect to="/LogIn"></Redirect>
  }

      
   
    
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home);