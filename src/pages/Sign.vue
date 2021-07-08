<template>
    <v-app>
        <v-main>
            <v-container>
                <v-row justify="end">
                    
                    <v-switch
                        append-icon="mdi-moon-waning-crescent"
                        v-model="$vuetify.theme.dark"
                        inset
                        flat
                        color="info"
                    >
                    </v-switch>                        
                </v-row>

                <v-row justify="space-around" >
                    
                    <v-card width="700">
                        <v-img height="200px" src="https://img.wallpapersafari.com/desktop/1600/900/6/31/TnNPlz.jpg" />
                        <v-container>
                            <v-form aria-autocomplete="false">
                                <v-col>
                                    <v-text-field
                                        label="Email"
                                        v-model="username"
                                        :rules="rulesUsername"
                                        :success-messages="['Valid email']"
                                        prepend-inner-icon="mdi-email"
                                    ></v-text-field>
                                </v-col>
                                <v-col>
                                    <v-text-field
                                        type="password"
                                        label="Password"
                                        v-model="password"
                                        prepend-inner-icon="mdi-lastpass"
                                    ></v-text-field>
                                </v-col>
                                <v-spacer></v-spacer>
                                <v-col>
                                    <v-btn block outlined color="success" class="mr-4" @click="signInMethod"> Login </v-btn>
                                </v-col>
                                <v-spacer></v-spacer>
                                <v-col v-if="showError">
                                    <v-alert
                                        dense
                                        outlined
                                        type="error"
                                        >
                                        {{ errorMessage }}
                                    </v-alert>
                                </v-col>
                            </v-form>
                        </v-container>
                    </v-card>
                </v-row>                    
            </v-container>
        </v-main>
        <v-footer app>
            <v-row justify="center">
                <v-icon color="info">mdi-copyright</v-icon> Powered by Gsus <v-icon color="info">mdi-shield-cross</v-icon>
            </v-row>
        </v-footer>
    </v-app>
</template>

<script>

    import axios from 'axios'
    export default {
        name: 'Sign',
        components: {

        },
        data(){
            return {
                showError: false,
                errorMessage: '',
                username: '',
                password: '',
                load: false,
                rulesUsername: [
                    value => !!value || 'An email is required.',
                    value => {
                        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        return pattern.test(value) || 'Invalid email format.'
                    },
                ],
            }
        },
        methods: {
            signInMethod(){
                localStorage.clear();
                this.load = true;
                if(this.username != '' && this.password != ''){
                    axios.post(
                        process.env.VUE_APP_SIGN_API,
                        {
                            'email': this.username,
                            'password': this.password
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                    ).then( response => {
                        if(response.request.status != 200){
                            this.errorMessage=response.request.status +' Error: '+JSON.parse(response.request.response).error
                            this.showError = true
                        }else{
                            localStorage.setItem('email', this.username)
                            this.$router.push('films');
                        }

                    }).catch( (error) => {
                        
                        this.errorMessage= error.request.status +' Error: '+JSON.parse(error.request.response).error
                        this.showError = true

                    }).finally(() => this.load = false )
                }
                else{
                    this.errorMessage='Email or password are required'
                    this.showError = true
                }
            }
        },
        created(){
            if(localStorage.getItem('email')){
                this.$router.push('films');
            }
        }
    }

</script>

<style scoped>
.row+.row {
    margin-top: 50px !important;
}
.v-footer {
    padding: 3vh;
}
.v-icon{
    padding-left: 1vh;
    padding-right: 1vh;
}

</style>
