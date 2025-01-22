// import React, { useEffect } from 'react';
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import { useNavigation } from '@react-navigation/native';


// const GoogleLogin = () => {

//   const navigation = useNavigation();

//   useEffect(() => {
//     GoogleSignin.configure({
//       webClientId: '637663824492-mt8ncepnivco5ieguicsi0shi0t93ese.apps.googleusercontent.com',
//       offlineAccess: false,
//       forceCodeForRefreshToken: true,

//     });
//   }, []);

//   const signInWithGoogle = async () => {
//     try {
//       await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
//       const { idToken } = await GoogleSignin.signIn();


//       if (!idToken) {
//         throw new Error('No ID token found');
//       }

//       const googleCredential = auth.GoogleAuthProvider.credential(idToken);
//       await auth().signInWithCredential(googleCredential);

//       console.log('Signed in with Google successfully!');
//     } catch (error) {
//       console.error('Google Sign-In Error:', error.message);
//       // navigation.navigate('Home');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.button} onPress={signInWithGoogle}>
//         <Text style={styles.buttonText}>Sign In with Google</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default GoogleLogin;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   button: {
//     backgroundColor: 'blue',
//     padding: 12,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';

const GoogleLogin = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '637663824492-mt8ncepnivco5ieguicsi0shi0t93ese.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }, []);

  // Function to create user with email and password
  const registerWithEmailAndPassword = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      Alert.alert('Success', `User ${userCredential.user.email} created successfully!`);
      navigation.navigate('Home'); // Navigate to home screen after successful registration
    } catch (error) {
      // Alert.alert('Error', error.message);
      navigation.navigate('Home'); 
    }
  };

  // Function to sign in with Google
  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();

      if (!idToken) {
        throw new Error('No ID token found');
      }

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);

      Alert.alert('Success', 'Signed in with Google successfully!');
      navigation.navigate('Home');
    } catch (error) {
      // Alert.alert('Google Sign-In Error', error.message);
      navigation.navigate('Home'); // Navigate to Home screen even if login fails
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity style={styles.button} onPress={registerWithEmailAndPassword}>
        <Text style={styles.buttonText}>Sign Up with Email</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleButton} onPress={signInWithGoogle}>
        <Text style={styles.buttonText}>Sign In with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GoogleLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 15,
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  googleButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
