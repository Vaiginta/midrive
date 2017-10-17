import React, { Component } from 'react';
import MapRoute from './map.js';
import data from '../data.json';

class App extends Component {

  constructor () {
    super();
    this.state = {
      coordinates:[],
      filters:[]
    }
  }

  viewRoute(coord) {
    this.setState({
      coordinates:coord
    });
  }

  setFilter(type, e) {
    let name = e.target.children[e.target.selectedIndex].value;
    let filters = this.state.filters;
    let newFilters = filters.filter(f => f.filterType !== type);
    var newFilter = {
      filterType:type,
      filterName:name
    };
    filters.push(newFilter);
    
    this.setState({
      filters:filters
    })
  }

  render () {
    let keys = Object.keys(data[0]);

    let finUniqueValues = (values) => {
      return values.reduce((uniqueArr,val) => {
        if (uniqueArr.indexOf(val) === -1) {
          uniqueArr.push(val);
        }
        return uniqueArr;
      }, []);
    }
    let filters = this.state.filters;
    
    let filterData = (data, filters, index) => {
      var filteredData;
      if (filters.length === 0) {
        return data
      } else {
        filteredData = data.filter(d => d[filters[index].filterType] === filters[index].filterName);
        index += 1;
        if (index >= filters.length) {
          return filteredData;  
        } else {
          return filterData(filteredData, filters, index); 
        }
      }
      
    }

    let filteredData = filterData(data, filters, 0);

    return (
      <div className='app-root'>
        { this.state.coordinates.length === 0 
        ? <div className='table'>
            <table>
              <thead>
                <tr>
                  { keys.map((key, i) => {
                    return (
                      <th key={i}>
                        { key }
                        <br />
                        {key !== 'route' && <select onChange={e => this.setFilter(key, e)}>
                          <option></option>
                          { finUniqueValues(filteredData.map(d => d[key])).map(opt => <option>{opt}</option>) }
                        </select>}
                      </th>
                    );
                  })}
                </tr>
              </thead>
            </table>
            <tbody>        
              { filteredData.map((d, i) => {
                  return (
                    <tr key={i}>
                      { keys.map((key, j) => {
                        return (
                          <td key={j}>
                            { key === 'route'
                                ? d.route === null ? 'no route' : <span onClick={() => this.viewRoute(d.route)}>view route</span>
                                : d[key] }
                          </td>
                        );
                      }) }
                  </tr>
                );
              }) }
            </tbody>
          </div>
        : <MapRoute coordinates = {this.state.coordinates} /> }
      </div>
    );
  }
}

export default App;
