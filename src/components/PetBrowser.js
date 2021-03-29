import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {
  render() {
    return (
      <div className="ui cards">
        hello
        {this.props.pets.map((pet, i) => {
          return (<Pet pet={pet} key={i} id={pet.id} onAdoptPet={this.props.onAdoptPet}/>)
        })}
      </div>
    )
  }
}

export default PetBrowser
