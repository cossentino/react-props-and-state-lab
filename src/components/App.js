import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: "all"
      }
    }
  }


  onAdoptPet = id => {
    const myPets = this.state.pets
    const myPetsUpdated = myPets.map( pet => {
      if (pet.id === id) {
        const newPet = {...pet, isAdopted: true}
        return newPet
      } else {
        return pet
      }
    })
    this.setState(
      {pets: myPetsUpdated}
    )
  }

  onChangeType = type => {
    this.setState(
      {
        filters: {
          type: type
        }
      }
    )
  }

  onFindPetsClick = () => {
    let category = this.state.filters.type
    if (category === "all" || category === "") {
      fetch("/api/pets")
      .then(resp => resp.json())
      .then(json => {
        json.forEach (pet => this.state.pets.push(pet))
      })
    } else {
      fetch(`/api/pets?type=${category}`)
      .then(resp => resp.json())
      .then(json => {
        json.forEach (pet => this.state.pets.push(pet))
      })
    }
  }


  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={e => this.onAdoptPet(e)} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
