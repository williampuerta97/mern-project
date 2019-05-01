import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

class Navigation extends Component{

    state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu stackable>
        <Menu.Item>
          <h1>CSI</h1>
        </Menu.Item>

        <Menu.Item
          name='users'
          active={activeItem === 'users'}
          onClick={this.handleItemClick}
          as={NavLink}
          exact to ="/usuarios"
        >
          Usuarios
        </Menu.Item>
      </Menu>
    )
  }
    
}

export default Navigation;