import Knex from 'knex';
import { v4 as uuid } from 'uuid';

export const seed = (knex: Knex) => {
  return knex('users').del()
    .then(() => knex('users').insert([
      { id: uuid(), name: "Ana Berg", email: "ana.berg@volztmotors.com", password: "123456", type: "ADMINISTRATOR" },
      { id: uuid(), name: "Rodrigo Vedovato", email: "rodrigo.vedovato@volztmotors.com", password: "123456", type: "ADMINISTRATOR" },
      { id: uuid(), name: "Renan Fichberg", email: "renan.fichberg@volztmotors.com", password: "123456", type: "ADMINISTRATOR" },
      { id: uuid(), name: "Leonardo Santos", email: "leonardo.santos@volztmotors.com", password: "123456", type: "ADMINISTRATOR" },
      { id: uuid(), name: "Roger Komesu", email: "roger.komesu@volztmotors.com", password: "123456", type: "EDITOR" },
      { id: uuid(), name: "Alexandre Lot", email: "alexandre.lot@volztmotors.com", password: "123456", type: "VIEWER" },
    ]))
}