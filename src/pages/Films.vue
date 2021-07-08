<template>
    <v-app id="films">
         <v-app-bar app>
             <v-container>
                 <v-row justify="start" class="row-top">
                    <v-col cols="2">
                        <v-switch
                            class="switch-icon"
                            append-icon="mdi-moon-waning-crescent"
                            v-model="$vuetify.theme.dark"
                            inset
                            flat
                            color="info"
                        >
                        </v-switch> 
                    </v-col>
                    <v-col cols="9">

                    </v-col>
                    <v-col cols="1">
                        <v-btn
                            class="mx-3"
                            fab
                            outlined
                            large
                            @click="logout()"
                            color="accent"
                            >
                            <v-icon dark>
                                mdi-account-off
                            </v-icon>
                        </v-btn>
                    </v-col>
                                           
                </v-row>
             </v-container>
        </v-app-bar>
        <v-main >
            <v-container>

                <v-card>
                    <v-card-title>
                        Search your films
                    </v-card-title>
                    <v-card-text>
                        <v-autocomplete
                            v-model="model"
                            :items="items"
                            :loading="load"
                            :search-input.sync="search"
                            color="white"
                            hide-no-data
                            hide-selected
                            item-text="ArrayToSearch"
                            item-value="Films"
                            label="List films"
                            placeholder="Start typing the title or descriptiona"
                            prepend-icon="mdi-database-search"
                            return-object
                        ></v-autocomplete>
                    </v-card-text>
                    <v-divider></v-divider>
                </v-card>

                <v-divider></v-divider>

                <v-expand-transition v-if="model">
                    <v-list
                        
                        class="secondary"
                    >
                        <v-list-item
                        v-for="(field, i) in fields"
                        :key="i"
                        >
                            <v-list-item-content v-if="field.key != 'ArrayToSearch'">
                                <v-list-item-title v-text="field.key"></v-list-item-title>
                                <v-list-item-subtitle v-text="field.value"></v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-expand-transition>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    outlined
                    :disabled="!model"
                    color="warning"
                    @click="model = null"
                >
                    Clear
                    <v-icon right>
                    mdi-close-circle
                    </v-icon>
                </v-btn>
                </v-card-actions>
                <v-spacer></v-spacer>
                
                <v-container fluid v-if="!model">
                    <v-row >
                        <v-col v-for="(film, i) in films" :key="i" :cols="6">
                            <v-card @click="showSelectedItem(film)">
                                <v-img
                                    src="https://pics.freeicons.io/uploads/icons/png/1981435991595452847-512.png"
                                    class="white--text align-end"
                                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                    height="200px"
                                />
                                <v-card-title>
                                    {{ film.title }}
                                </v-card-title>
                                <v-card-text>
                                    <v-row class="col-12">
                                        {{ film.original_title }}
                                    </v-row>
                                </v-card-text>
                                <v-divider class="mx-4"></v-divider>
                                <v-card-title>
                                    Producer
                                </v-card-title>
                                <v-card-text v-if="film.producer.includes(',')">
                                    <v-chip v-for="(producer, j) in film.producer.split(',')" :key="j" color="info">{{producer}}</v-chip>
                                </v-card-text>
                                <v-card-text v-else>
                                    <v-chip color="info">{{ film.producer }}</v-chip>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                        
                </v-container>

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
        name: 'Films',
        components: {

        },
        data(){
            return{
                descriptionLimit: 60,
                films: [],
                model: null,
                search: null,
                load: false

            }
        },
        computed: {
            fields () {
                if (!this.model) return []

                return Object.keys(this.model).map(key => {
                return {
                    key,
                    value: this.model[key] || 'n/a',
                }
                })
            },
            items () {
                return this.films.map(entry => {
                const Title = entry.title.length > this.descriptionLimit
                    ? entry.title.slice(0, this.descriptionLimit) + '...'
                    : entry.title
                const Description = entry.description.length > this.descriptionLimit
                    ? entry.description.slice(0, this.descriptionLimit) + '...'
                    : entry.description
                const ArrayToSearch=[Title, Description]

                return Object.assign({}, entry, { ArrayToSearch })
                })
            },
        },
        watch: {
            search () {
                // Items have already been loaded
                if (this.items.length > 0) return

                // Items have already been requested
                if (this.isLoading) return

                this.isLoading = true

                // Lazily load input items
                fetch(process.env.VUE_APP_GIBHIL)
                .then(res => res.json())
                .then(res => {
                    const { count, films } = res
                    this.count = count
                    this.films = films
                })
                .catch(err => {
                    console.log(err)
                })
                .finally(() => (this.isLoading = false))
            },
        },
        methods:{
            loadFilms(){
                axios.get(
                    process.env.VUE_APP_GIBHIL
                ).then( response => {
                    if(response.request.status != 200){
                            this.errorMessage=response.request.status +' Error: '+JSON.parse(response.request.response).error
                            this.showError = true
                    }else{
                        this.films = response.data
                    }
                })
            },
            showSelectedItem(film){
                this.model=film
            },
            logout(){
                localStorage.clear();
                this.$router.push('/');
            }


        },
        created(){
            if(localStorage.getItem('email')){
                this.loadFilms()
            }else{
                this.$router.push('/');
            }
            
        }
    }
</script>

<style scoped>
.switch-icon{
    padding-right: 4vh;
}
.v-btn--fab.v-size--large {
    height: 44px;
    width: 44px;
}
.row-top{
    margin-top: 5px;
}
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
