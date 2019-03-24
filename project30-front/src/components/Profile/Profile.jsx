import React from "react";
import classnames from "classnames";

// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import ProfileService from "./ProfileService";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Label,
  FormGroup,
  Form,
  Input,
  
  NavItem,
  NavLink,
  Nav,
  Table,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  
  UncontrolledCarousel
} from "reactstrap";

const carouselItems = [
  {
    src: require("../../assets/img/denys.jpg"),
    altText: "Slide 1",
    caption: "Big City Life, United States"
  },
  {
    src: require("../../assets/img/fabien-bazanegue.jpg"),
    altText: "Slide 2",
    caption: "Somewhere Beyond, United States"
  },
  {
    src: require("../../assets/img/mark-finn.jpg"),
    altText: "Slide 3",
    caption: "Stocks, United States"
  }
];
let ps = null;

class ProfilePage extends React.Component {
  state = {
    tabs: 1,
    profile: {},
    isLoading: false,
    isEditing: false,
    location: "",
    bio: ""
  };

  service = new ProfileService();

  componentDidMount = () => {
    //Profile styles
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.body.classList.toggle("profile-page");

    //Backend request to profile info
    this.setState({ isLoading: true });
    const { id: userId } = this.props.match.params;

    this.service
      .getUser(userId)
      .then(response => {
        this.setState({ isLoading: false });
        this.setState({ profile: response.profile });
      })
      .catch(err => {
        this.setState({ isLoading: false });
        console.log(err);
      });
  };

  componentWillUnmount = () => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.documentElement.className += " perfect-scrollbar-off";
      document.documentElement.classList.remove("perfect-scrollbar-on");
    }
    document.body.classList.toggle("profile-page");
  };

  toggleTabs = (e, stateName, index) => {
    e.preventDefault();
    this.setState({
      [stateName]: index
    });
  };

  //Handle Edit
  handleEdit = event => {
    event.preventDefault();
    this.setState({ isEditing: true });
  };

  
  handleSubmit = (event) => {

    event.preventDefault();
    this.setState({ isLoading: true });
    const userId = this.props.match.params;
    const location = this.state.location;
    const bio = this.state.bio;
    this.service.createUpdateUser(userId,location,bio)
    .then(response => {
      
      this.setState({
        profile:response.profile, 
        location:"",
        bio:"",
        isLoading:false})
    })
    .catch(err => alert(err))

  }


  
  onChange = event => {
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  };

  render() {
    debugger;
    const avatar = this.props.loggedInUser.avatarUrl;
    const userName = this.props.loggedInUser.username;
    const location = this.state.profile.location;

    return (
      <>
        <div className="wrapper">
          <div className="page-header">
            <img
              alt="..."
              className="dots"
              src={require("../../assets/img/dots.png")}
            />
            <img
              alt="..."
              className="path"
              src={require("../../assets/img/path4.png")}
            />
            <Container className="align-items-center">
              <Row>
                <Col lg="6" md="6">
                  <h1 className="profile-title text-left">{userName}</h1>

                  <h5 className="text-on-back">01</h5>
                  <p className="profile-description">
                    {this.state.profile.bio}
                  </p>
                </Col>
                <Col className="ml-auto mr-auto" lg="4" md="6">
                  <Card className="card-coin card-plain">
                    {!this.state.isLoading && (
                      <CardHeader>
                        <img
                          alt={this.state.profile.handle}
                          className="img-center img-fluid rounded-circle"
                          src={avatar}
                        />

                        <h4 className="title">Country {location}</h4>
                        {/* Edit Profile Button */}
                        <Button
                          className="btn-simple"
                          color="primary"
                          onClick={this.handleEdit}
                        >
                          <i className="tim-icons icon-book-bookmark" /> Edit
                          Profile
                        </Button>
                      </CardHeader>
                    )}
                    <CardBody>
                      <Nav
                        className="nav-tabs-primary justify-content-center"
                        tabs
                      >
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: this.state.tabs === 1
                            })}
                            onClick={e => this.toggleTabs(e, "tabs", 1)}
                            href="#pablo"
                          >
                            Wallet
                          </NavLink>
                        </NavItem>

                        {/* Edit navLink */}
                        {this.state.isEditing && (
                          <NavItem>
                            <NavLink
                              className={classnames({
                                active: this.state.tabs === 2
                              })}
                              onClick={e => this.toggleTabs(e, "tabs", 2)}
                              href="#pablo"
                            >
                              Send
                            </NavLink>
                          </NavItem>
                        )}
                      </Nav>
                      <TabContent
                        className="tab-subcategories"
                        activeTab={"tab" + this.state.tabs}
                      >
                        <TabPane tabId="tab1">
                          <Table className="tablesorter" responsive>
                            <thead className="text-primary">
                              <tr>
                                <th className="header">COIN</th>
                                <th className="header">AMOUNT</th>
                                <th className="header">VALUE</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>BTC</td>
                                <td>7.342</td>
                                <td>48,870.75 USD</td>
                              </tr>
                              <tr>
                                <td>ETH</td>
                                <td>30.737</td>
                                <td>64,53.30 USD</td>
                              </tr>
                              <tr>
                                <td>XRP</td>
                                <td>19.242</td>
                                <td>18,354.96 USD</td>
                              </tr>
                            </tbody>
                          </Table>
                        </TabPane>

                        {this.state.isEditing && (
                          <TabPane tabId="tab2">
                            <Form onSubmit={this.handleSubmit}>
                              {/* Location */}
                              <Row>
                                <Label sm="3">Location</Label>
                                <Col sm="9">
                                  <FormGroup>
                                    <Input
                                      placeholder="from where are you visiting us"
                                      type="text"
                                      name="location"
                                      onChange={this.onChange}
                                      value={this.state.location}
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>

                              {/* Bio */}
                              <Row>
                                <Label sm="3">Bio</Label>
                                <Col sm="9">
                                  <FormGroup>
                                    <Input
                                      placeholder="tell us something about you"
                                      type="text"
                                      name="bio"
                                      onChange={this.onChange}
                                      value={this.state.bio}
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>

                              <Button
                                className="btn-simple btn-icon btn-round float-right"
                                color="primary"
                                type="submit"
                              >
                                <i className="tim-icons icon-send" />
                              </Button>
                            </Form>
                          </TabPane>
                        )}
                      </TabContent>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>

          {/* Favorite movies */}
          <div className="section">
            <Container>
              <Row className="justify-content-between">
                <Col md="6">
                  <Row className="justify-content-between align-items-center">
                    <UncontrolledCarousel items={carouselItems} />
                  </Row>
                </Col>
                <Col md="5">
                  <h1 className="profile-title text-left">Favorite movies</h1>
                  <h5 className="text-on-back">02</h5>
                  <p className="profile-description text-left">
                    An artist of considerable range, Ryan — the name taken by
                    Melbourne-raised, Brooklyn-based Nick Murphy — writes,
                    performs and records all of his own music, giving it a warm,
                    intimate feel with a solid groove structure. An artist of
                    considerable range.
                  </p>

                  <div className="btn-wrapper pt-3">
                    <Button className="btn-simple" color="primary">
                      <i className="tim-icons icon-book-bookmark" /> Edit
                      Profile
                    </Button>

                    <Button
                      className="btn-simple"
                      color="info"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="tim-icons icon-bulb-63" /> Check it!
                    </Button>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </>
    );
  }
}
export default ProfilePage;
