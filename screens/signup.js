import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';
import { Colors } from '../assets/colors';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Testing purposes only

export default function SignUpScreen({ navigation }) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = async() => {
        if (!password || !confirmPassword) {
            Alert.alert('Signup Failed', 'Password cannot be empty');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Signup Failed', 'Passwords do not match');
            return;
        }

        // Save user data
        try {
            await AsyncStorage.setItem('userEmail', email);
            await AsyncStorage.setItem('userFirstName', firstName);
            await AsyncStorage.setItem('userLastName', lastName);
            await AsyncStorage.setItem('userPassword', password); 

            Alert.alert('Signup Successful', 'Your account has been created');
            navigation.navigate('Login'); // Navigate to the login screen
        } catch (error) {
            Alert.alert('Signup Failed', 'Error saving user data');
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
