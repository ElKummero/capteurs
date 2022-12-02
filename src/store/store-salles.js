import { api } from 'boot/axios'
import { afficherMessageErreur } from 'src/fonctions/message-erreur'

// State : données du magasin
const state = {
  listeSalles: [
    {
      name: 'B1-01',
      id: 1,
      mesures: {
        date: '2021-02-23',
        temperature: 29.66,
        humidite: 95.23
      }
    },
    {
      name: 'B1-02',
      id: 2,
      mesures: {
        date: '2021-05-29',
        temperature: 27.54,
        humidite: 96.48
      }
    },
    {
      name: 'B1-03',
      id: 3,
      mesures: {
        date: '2021-02-13',
        temperature: 32.12,
        humidite: 99.33
      }
    }
  ]
}

/*
Mutations : méthode qui manipulent les données
Les mutations ne peuvent pas être asynchrones !!!
 */
const mutations = {
  setSalles (state, salles) {
    state.listeSalles = salles
  }
}
/*
Actions : méthodes du magasin qui font appel aux mutations
Elles peuvent être asynchrones !
 */
const actions = {
  getCapteursApi ({ commit }) {
    api.get('http://tempapi.divtec.me/api/capteurs')
      .then(function (response) {
        console.log('Reussie')
        console.log(response)
        commit('setClients', response.data.results)
      })
      .catch(function (error) {
        console.log('Erreur')
        afficherMessageErreur(
          'Erreur lors de la récupération des températures.'
        )
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
