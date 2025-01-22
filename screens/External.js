import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { statusCodes, GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin'

const External = () => {

    const [user , setUser] = React.useState({  })

    useEffect(() =>{
        GoogleSignin.configure({
            webClientId: '1072997953483-ukubi7od109d8809hsb42pga3kbhv3uo.apps.googleusercontent.com',
            offlineAccess: true,
            forceCodeForRefreshToken: true,
        });

        isSignedIn()
    }, [])

    const signIn = async () => {  
        try{
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(' due___' , userInfo);
            setUser(userInfo)

        } 
        catch(error){
            console.log('Message___' ,  error.message)
            if(error.code === statusCodes.SIGN_IN_CANCELLED){
                console.log('User cancelled the login flow')
            }
            else if(error.code === statusCodes.IN_PROGRESS){
                console.log('Signing in user')
            } else if(error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE){
                console.log(' Play Service is not available')
            }
            else{
                console.log("Another error ")
            }
        }
    }

    const isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn()
        if(!!isSignedIn){
            getCurrentUserInfo()
        }else{
            console.log('User is not signed in')
        }
    }

    const getCurrentUserInfo = async () => {  
        try {
            const userInfo = await GoogleSignin.signInSilently();  
            console.log("Edit___" , user);
            setUser(userInfo)
        }
        catch (error){
            if(error.code === statusCodes.SIGN_IN_REQUIRED){
                Alert.alert("User is not signed in yet")
                console.log('User is not signed in yet')
            }
            else{
                console.log('something is wrong')
                Alert.alert("something went wrong ")
            }
        } 
    }

    const signOut = async () => {
        try{
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            setUser({});
        }
        catch(error){
            console.error(error);
        }
    }

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View>

                {!user.idToken ? (
                    <GoogleSigninButton
                    style={{ width: 192, height: 48 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={signIn}
                    />
                ) : (
                   
                    <TouchableOpacity onPress={signOut}>
                        <Text>Sign Out</Text>
                    </TouchableOpacity>
                )}

            </View>

        </View>
        
    )
}

export default External;