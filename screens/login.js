import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';
import { Colors } from '../assets/colors';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Testing purposes only

export default function LoginScreen({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        // Check if user email exists in AsyncStorage and set it in state
        const loadUserData = async () => {
            const storedEmail = await AsyncStorage.getItem('userEmail');
            if (storedEmail) {
                setEmail(storedEmail);
            }
        };
        loadUserData();
    }, []);

    const handleLogin = async () => {
        const storedEmail = await AsyncStorage.getItem('userEmail');
        const storedPassword = await AsyncStorage.getItem('userPassword');

        if (email === storedEmail && password === storedPassword) {
            Alert.alert('Login Successful');
            navigation.replace('MainApp'); // Navigate to main screen
        } else {
            Alert.alert('Invalid credentials');
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Login</Text>
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
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>LOGIN</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.signupText}>Not yet registered? Signup Now</Text>
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
