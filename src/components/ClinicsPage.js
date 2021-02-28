import React, { Component, Fragment } from 'react';
import axios from "axios";
import Clinics from './clinics'
import { Button } from '@material-ui/core';

const config = require('../config.json');

export default class Products extends Component {

  state = {
    newproduct: null,
    products: []
  }

  fetchClinics = async () => {
    // add call to AWS API Gateway to fetch products here
    // then set them in state
    console.log(this.props.auth.user.username)
    try {
      const res = await axios.get(`${config.api.invokeUrl}/clinic-owner/clinics?username=${this.props.auth.user.username}`);
      const products = res.data;
      this.setState({ products: products });
    } catch (err) {
      console.log(`Failed to fetch all clinics: ${err}`);
    }
  }

  componentDidMount = () => {
    this.fetchClinics();
  }

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <div style={{
              display: 'flex',
              justifyContent: "space-between"
            }}>
              <h1>Clinics</h1>

              <Button
                variant="contained"
                size="small"
                // color="primary"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/clinics/createClinic';
                }}
                style={{
                  fontWeight: "bold",
                  backgroundColor:"white",
                  color:"#00d1b2"
            
                }}
              >
                Add new Clinic
              </Button>
            </div>
            {/* <p className="subtitle is-5">Invest in a brilliant future with our efficient and cost-effective system:</p> */}
            <br />
            <div className="columns">
              <div className="column">
                <div className="tile is-ancestor">
                  {
                    this.state.products && this.state.products.length > 0
                      // ? this.state.products.map(product => <Product name={product.productname} id={product.id} key={product.id} />)
                      ? <Clinics clinics={this.state.products}></Clinics>
                      : <div className="tile notification is-warning">No clinics available</div>
                  }
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    )
  }
}
