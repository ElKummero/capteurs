import { api } from 'boot/axios'
import { afficherMessageErreur } from 'src/fonctions/message-erreur'
import users from './store-auth'

// State : données du magasin
const state = {
  listeSalles: []
}

/*
Mutations : méthode qui manipulent les données
Les mutations ne peuvent pas être asynchrones !!!
 */
const mutations = {
  setSalles (state, salles) {
    state.listeSalles = salles
    console.log(state.listeSalles)
  }
}
/*
Actions : méthodes du magasin qui font appel aux mutations
Elles peuvent être asynchrones !
 */
const actions = {
  getCapteursApi ({ commit, rootState }) {
    console.log('get capteurs api')
    const config = {
      headers: { Authorization: 'Bearer ' + rootState.auth.token }
    }
    api.get('/capteurs', config)
      .then(function (response) {
        console.log('Reussie')
        console.log(response.data)
        commit('setSalles', response.data)
      })
      .catch(function (error) {
        if (!users.getters.user()) {
          console.log('test')
          alert('Connectez vous pour avoir accès au capteurs.')
        }
        console.log('Erreur lors de la récupération des températures. Essayez de vous connecter')
        afficherMessageErreur('Erreur lors de la récupération des températures.')
        throw error
      })
  }
}

/*
Getters : retourne les données du magasin
Fonctionne comme les propriétés calculées
Sert à calculer, trier, filtrer ou formater les donneés
 */
const getters = {
  // Prend le state comme 1er paramètre
  listeSalles (state) {
    return state.listeSalles
  }
}

/*
Exporte les constantes, variables du fichier
On pourra ainsi les récupérer, les importer dans un autre fichier JS.

namespace: true, ajoute un namespace à notre objet retourné.
 */
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
