import React, { Component } from 'react';
import logo from './sources/chick.png';
import './App.css';
import Game from './Game';
import logoFodder from './sources/fodder.png'
import farmerPNG from './sources/farmer.png'
import tractorPNG from './sources/tractor.png'
import windHill from './sources/windhill.svg'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
    this.game = new Game();

  }
  componentDidMount() {
    setInterval(() => {
      this.game.update();
      this.setState({});
    }, 100);
  }
  
  
  update = () => {
    this.game.update();
    
  }
  render() {
    return (
      
      <div className="App">
        <header className="App-header">
          <div className="tcontainer">
            <div className="ticker-wrap">
              <div className="ticker-move">
                <div className="ticker-item">{this.game.newTitle}</div>
                <div className="ticker-item">{this.game.newTitle}</div>
              </div>
            </div>
          </div>
          Chicken Farm

        </header>
        <div>
          <input className= "App-logo" alt="collect" onClick={this.game.collectEgg} disabled={!this.game.canCollectEgg()} type="image" src={logo} />
        </div>

        <div className="Egg-Number">
         Collected Egg : {this.game.collectedEgg}
        </div>
        <div style={{ marginTop: '10px' }}>
          Money : {this.game.money} ₺
        </div>
        <hr />
        <div>
          İşletme
          <table>
          <tbody>

          
            <tr>
              <td style={{ width: "150px" }}>Kasadaki para :</td>
              <td>{this.game.money}₺</td>
            </tr>
            <tr>
              <td>Dolaptaki Adet :</td>
              <td>{this.game.currentEgg}</td>

            </tr>
            <tr>
              <td>Fiyat :</td>
              <td>{this.game.price}₺
              <button onClick={this.game.increasePrice} style={{ marginLeft: "10px", width: "25px", background: 'black', color: 'white' }}>+</button>
                <button disabled={!this.game.canDecreasePrice()} onClick={this.game.decreasePrice} style={{ marginLeft: "10px", width: "25px", background: 'black', color: 'white' }}>-</button>
              </td>

              

            </tr>
            <tr>
              <td>Halkın Talebi :</td>
              <td>%{this.game.demandRate  }</td>

            </tr>
            </tbody>
          </table>
          <hr />
          <div >
            Üretim
          <table>
          <tbody>
              <tr>
                <td style={{ width: "150px" }}>Egg / Second :</td>
                  <td>{this.game.lastCollectedEggRate}</td>
              </tr>

              <tr>
                <td >Fodder ({this.game.fodderCost}₺) :</td>
                  <td>{this.game.fodder} gr  </td>
                  <td><input disabled={!this.game.canBuyFodder()} alt="fodder" className="App-logo2" onClick={this.game.buyFodder} type="image" src={logoFodder} /></td>
                
              </tr>
                <tr>
                  <td >Farmer : {this.game.autoCollector.farmerCount}</td>
                  <td>Buy it :{this.game.autoCollector.farmerCost} ₺ </td>
                  <td><input disabled={!this.game.canBuyAutoCollector("Farmer")} alt="farmer" className="App-logo2" onClick={() => this.game.buyAutoCollector("Farmer")} type="image" src={farmerPNG} /></td>
                  <td >Tractor : {this.game.autoCollector.tractorCount}</td>
                  <td>Buy it : {this.game.autoCollector.tractorCost} ₺ </td>
                  <td><input disabled={!this.game.canBuyAutoCollector("Tractor")} alt="tractor" className="App-logo2" onClick={() => this.game.buyAutoCollector("Tractor")} type="image" src={tractorPNG} /></td>
                  <td >Wind Hill : {this.game.autoCollector.windHillCount}</td>
                  <td>Buy it : {this.game.autoCollector.windHillCost} ₺ </td>
                  <td><input disabled={!this.game.canBuyAutoCollector("WindHill")} alt="windHill" className="App-logo2" onClick={() => this.game.buyAutoCollector("WindHill")} type="image" src={windHill} /></td>
                </tr>
                
                  

              </tbody>
            </table>
            
          </div>
          
        </div>

      </div>
    );
  }
}

export default App;

