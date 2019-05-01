import React, { Component } from 'react'
import { Table, Container, Form, Button } from 'semantic-ui-react'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
const BASE_URI = 'http://localhost:3001/users'

class User extends Component{
    constructor(){
        super();
        this.handleAddUser = this.handleAddUser.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleEditUser = this.handleEditUser.bind(this)
        this.state = {
            nit: '', nombre: '', apellido:'', edad:'', _id:'', users: [], buttonStatus: 'Agregar', buttonColor: 'blue'
        }
    }

    componentDidMount(){
        this.fetchUsers()
    }

    handleInputChange(e){
        const {name, value} = e.target
        this.setState({
            [name]:value
        })
    }

    handleAddUser(e){
        e.preventDefault()
        let u = {
            nit: e.target.nit.value,
            nombre: e.target.nombre.value,
            apellido: e.target.apellido.value,
            edad: e.target.edad.value,
        }
        if(this.state._id){
            
            fetch(`${BASE_URI}/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(u),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                toastr.success(data.message)
                this.setState({nit: '', nombre: '', apellido:'', edad:'', _id:'', buttonStatus: 'Agregar', buttonColor: 'blue'})
                this.fetchUsers()
            })
            .catch(err => console.log(err))
        }else{
            
            fetch(BASE_URI, {
                method: 'POST',
                body: JSON.stringify(u),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                toastr.success(data.message)
                this.setState({nit: '', nombre: '', apellido:'', edad:''})
                this.fetchUsers()
            })
            .catch(err => console.log(err))
        }
    }

    fetchUsers(){
        fetch(BASE_URI)
        .then(res => res.json())
        .then(data => {
            this.setState({users: data})
        })
        .catch(err => console.log(err))
    }

    handleEditUser(id){
    
        fetch(`${BASE_URI}/${id}`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                _id: data._id,
                nit: data.nit,
                nombre: data.nombre,
                apellido: data.apellido,
                edad: data.edad,
                buttonStatus: 'Actualizar',
                buttonColor: 'orange'
            })
        })
        .catch(err => console.log(err))
    }
    
    handleDeleteUser(id){
        if(window.confirm('¿Quieres borrar permanentemente el registro?')){
            fetch(`${BASE_URI}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                toastr.success(data.message)
                this.fetchUsers()
            })
            .catch(err => console.log(err))
        }
    }
    
    render(){
        const { users } = this.state;
        
        return(
            <Container>
                <Form onSubmit={this.handleAddUser}>
                    <Form.Field>
                        <label>NIT</label>
                        <input value={this.state.nit} onChange={this.handleInputChange} type='number' name='nit'/>
                    </Form.Field>
                    <Form.Field>
                        <label>NOMBRE</label>
                        <input value={this.state.nombre} onChange={this.handleInputChange} type='text' name='nombre'/>
                    </Form.Field>
                    <Form.Field>
                        <label>APELLIDO</label>
                        <input value={this.state.apellido} onChange={this.handleInputChange} type='text' name='apellido'/>
                    </Form.Field>
                    <Form.Field>
                        <label>EDAD</label>
                        <input value={this.state.edad} onChange={this.handleInputChange} type='number' name='edad'/>
                    </Form.Field>
                    <Button color={this.state.buttonColor} type='submit'>{this.state.buttonStatus}</Button>
                </Form>

                <Table striped>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>NIT</Table.HeaderCell>
                        <Table.HeaderCell>NOMBRE</Table.HeaderCell>
                        <Table.HeaderCell>APELLIDO</Table.HeaderCell>
                        <Table.HeaderCell>EDAD</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                    {users.map((user, i) => 
                        <Table.Row key={i}>
                            <Table.Cell>{user.nit}</Table.Cell>
                            <Table.Cell>{user.nombre}</Table.Cell>
                            <Table.Cell>{user.apellido}</Table.Cell>
                            <Table.Cell>{user.edad}</Table.Cell>
                            <Table.Cell><Button onClick={() => this.handleEditUser(user._id)} color='orange'>Actualizar</Button></Table.Cell>
                            <Table.Cell><Button onClick={() => this.handleDeleteUser(user._id)} color='red'>Eliminar</Button></Table.Cell>
                        </Table.Row>
                    )}
                    </Table.Body>
                </Table>
            </Container>
        );
    }
}

export default User