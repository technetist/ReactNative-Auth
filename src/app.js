import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, CardSection } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
	state = { loggedIn: null };

	componentWillMount() {
		firebase.initializeApp({
			apiKey: 'AIzaSyBQ15c39JYe3lSKVTt0JVZOZ11B56oNYss',
			authDomain: 'react-native-auth-4cc87.firebaseapp.com',
			databaseURL: 'https://react-native-auth-4cc87.firebaseio.com',
			projectId: 'react-native-auth-4cc87',
			storageBucket: 'react-native-auth-4cc87.appspot.com',
			messagingSenderId: '71561574039'
		});

		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({ loggedIn: true });
			} else {
				this.setState({ loggedIn: false });
			}
		});
	}

	renderContent() {
		switch (this.state.loggedIn) {
			case true:
				return (
					<CardSection>
						<Button onPress={() => firebase.auth().signOut()}>
							Log Out
						</Button>
					</CardSection>
				);

			case false:
				return <LoginForm />;

			default:
				return <CardSection><Spinner size="large" /></CardSection>;
		}
	}


	render() {
		return (
			<View>
				<Header headerText='Authentication' />
				{this.renderContent()}
			</View>
		);
	}
}

export default App;
