import React from 'react';
import axios from 'axios';

class UserCard extends React.Component {
    
    state = {
        userInput: '',
        user: {},
        followers: []
    }

    componentDidMount() {
        axios.get('https://api.github.com/users/bneil7')
        .then(response => {
            console.log(response.data)
            this.setState({
                user: response.data
            })
        })

        axios.get('https://api.github.com/users/bneil7/followers')
        .then(response => {
            this.setState({
                followers: response.data
            })
        })
    }

    handleChanges = event => {
        this.setState({
            userInput: event.target.value
        })
    }

    fetchInfo = event => {
        event.preventDefault();

        axios.get(`https://api.github.com/users/${this.state.userInput}`)
            .then(response => {
                console.log(response.data)
                this.setState({
                    user: response.data
                })
            })
            .catch(error => {
                console.log('WHOOPS', error)
            })

        axios.get(`https://api.github.com/users/${this.state.userInput}/followers`)
            .then(response => {
                console.log(response.data)
                this.setState({
                    followers: response.data
                })
            })
    }

    render() {
        return(
            <>
            <h1>GitHub User Cards</h1>
            <input
                type='text'
                value={this.state.userInput}
                onChange={this.handleChanges}
                placeholder='Enter GitHub Username'
                />
            
            <button onClick={this.fetchInfo}>Search!</button>
            <div>
                <h2>{this.state.user.name}</h2>
                <a href={this.state.user.html_url}>
                {this.state.user.login}
                </a>
                <img 
                    src={this.state.user.avatar_url}
                    alt='useravatar'
                />
                <p>{this.state.user.bio}</p>
            </div>
            <div>
                <h3>Followers</h3>
                <h4>{this.state.followers.map(follower => (
                    <p key={follower.id}>
                        {follower.name}
                    </p>
                        
                ))}</h4>
                <div>
                    {this.state.followers.map(follower=> (
                        <a 
                            href={follower.html_url}
                            key={follower.id}
                        >
                            <p>{follower.login}</p>
                            <img 
                                src={follower.avatar_url}
                                key={follower.id}
                                alt='follower'
                            />
                        </a>
                    ))}
                </div>
                    
            </div>
            </>
        )
    }
}

export default UserCard;