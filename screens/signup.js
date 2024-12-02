import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';
import { Colors } from '../assets/colors';

export default function SignUpScreen({ navigation }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = async () => {
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            Alert.alert('Signup Failed', 'All fields are required');
            return;
        }
        
        if (password !== confirmPassword) {
            Alert.alert('Signup Failed', 'Passwords do not match');
            return;
        }
        
        try {
            const response = await fetch('http://10.0.2.2:3000/api/users/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, email, password }),
            });
            
            const result = await response.json();
            
            if (response.ok) {
                Alert.alert('Signup Successful', result.message);
                navigation.navigate('Login'); // Navigate to login screen
            } else {
                Alert.alert('Signup Failed', result.message);
            }
            } catch (error) {
            Alert.alert('Error', 'Unable to connect to the server');
            }
        };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>SignUp</Text>
                <View style={styles.inputContainer}>
                    <FontAwesome name="user" size={20} color={Colors.primaryBlue} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        value={firstName}
                        onChangeText={setFirstName}
                        placeholderTextColor="#888"
                        autoCapitalize="words"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <FontAwesome name="user" size={20} color={Colors.primaryBlue} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        value={lastName}
                        onChangeText={setLastName}
                        placeholderTextColor="#888"
                        autoCapitalize="words"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <FontAwesome name="envelope" size={20} color={Colors.primaryBlue} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        placeholderTextColor="#888"
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.inputContainer}>
                <FontAwesome name="lock" size={20} color={Colors.primaryBlue} style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="#888"
                />
                </View>
                <View style={styles.inputContainer}>
                <FontAwesome name="lock" size={20} color={Colors.primaryBlue} style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    placeholderTextColor="#888"
                />
                </View>
                <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
                    <Text style={styles.loginButtonText}>SIGNUP</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.signupText}>Already have an account? Log in</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F5',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    card: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 30,
        elevation: 10, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOpacity: 0.2,
        shadowRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: Colors.primaryBlue,
        textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        position: 'relative',
        width: '100%',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: Colors.primaryBlue,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 20,
        paddingLeft: 45,
    },
    icon: {
        position: 'absolute',
        left: 15,
        top: 34,
    },
    loginButton: {
        width: '100%',
        height: 50,
        backgroundColor: Colors.primaryBlue,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
    signupText: {
        marginTop: 20,
        color: Colors.primaryBlue,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
});
