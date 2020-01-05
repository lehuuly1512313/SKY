import React, { Component } from 'react';
import ProductItems from './../../components/KeyListItems/KeyListItems'
import ProductList from './../../components/KeyLists/KeyLists'


import { Link } from 'react-router-dom'
import apiCall from './../../utilsApi/apiCall'


class AdminPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    apiCall('users', 'GET', null).then(res => {
      this.setState({
        products: res.data
      })
    })
  }




  findIndex = (products, id) => {
    var result = -1;
    products.forEach((product, index) => {
      if (product.id === id) {
        result = index;
        console.log(result + 'index dell')
      }
    });
    return result
  }


  onDelete = (id) => {
    var { products } = this.state;
    apiCall(`users/${id}`, 'DELETE', null).then(res => {
      if (res.status === 200) {
        // eslint-disable-next-line no-undef
        var index = this.findIndex(products, id);
        if (index !== -1) {
          products.splice(index, 1);
          this.setState({
            products: products
          })
        }
      }
    })
  }

  render() {
    //var {products} = this.props;

    var { products } = this.state;

    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <Link to='/product/add' className="btn btn-primary mb-10">Them san pham</Link>
        <ProductList>
          {this.showProducts(products)}
        </ProductList>
      </div>

    );
  }

  showProducts(products) {
    var result = null;
    if (products.length > 0) {
      result = products.map((product, index) => {
        return (
          <ProductItems
            key={index}
            product={product}
            index={index}
            onDelete={this.onDelete}
          />
        )
      })
    }
    return result;
  }
}






export default AdminPage