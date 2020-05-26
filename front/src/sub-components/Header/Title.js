
import * as React from 'react';

export default class Title extends React.Component {
  render() {
    const {title} = this.props
    return (
      <div>
        
 {/* Content Header (Page header) */}
 <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0 text-dark">{title}</h1>
          </div>{/* /.col */}
          <div className="col-sm-6">
              {/*
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a  href="facke_url">Home</a></li>
              <li className="breadcrumb-item active">Dashboard v2</li>
            </ol>
            */}
          </div>{/* /.col */}
        </div>{/* /.row */}
      </div>{/* /.container-fluid */}
    </div>
    {/* /.content-header */}



      </div>
    );
  };
};