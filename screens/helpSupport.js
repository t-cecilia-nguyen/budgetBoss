import React, { useState, useEffect, useContext} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Colors } from '../assets/colors';
import { UserContext } from '../context/userContext';

export default function HelpSupport() {
	const { user } = useContext(UserContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    // Populate name and email fields if user is logged in
    useEffect(() => {
        if (user) {
            setName(`${user.firstName} ${user.lastName}`);
            setEmail(user.email);
        }
    }, [user]);

    const handleSubmit = async () => {
        // Validate input
        if (!name || !email || !message) {
            Alert.alert('Please fill all fields.');
            return;
        }
        const formspreeUrl = 'https://formspree.io/f/xrbgrjzl';
        try {
            const response = await fetch(formspreeUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    message,
                }),
            });

            if (response.ok) {
                Alert.alert('Thank you for reaching out! We will get back to you soon.');
                // Reset message field
                setMessage('');
            } else {
                Alert.alert('Something went wrong. Please try again later.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            Alert.alert('Something went wrong. Please try again later.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Help and Support</Text>

            <TextInput
                style={[styles.input ,{color: Colors.lightBlue}]}
                value={name}
                onChangeText={setName}
                editable={false}
            />

            <TextInput
                style={[styles.input ,{color: Colors.lightBlue}]}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                editable={false}
            />

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textArea}
                    placeholder="Enter your message here..."
                    value={message}
                    onChangeText={setMessage}
                    multiline
                    numberOfLines={8}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.primaryBlue,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingLeft: 10,
    },
    textArea: {
        height: 150,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: Colors.primaryBlue,
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
