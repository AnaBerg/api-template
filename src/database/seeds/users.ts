import Knex from 'knex';
import { v4 as uuid } from 'uuid';

import { encryptPassword } from '../../security/password_encryption';

export const seed = async (knex: Knex) => {
  const password = await encryptPassword("123456");
  return knex('users').del()
    .then(() => knex('users').insert([
      { id: uuid(), name: "Ana Berg", email: "ana.berg@volztmotors.com", password, type: "ADMINISTRATOR" },
      { id: uuid(), name: "Rodrigo Vedovato", email: "rodrigo.vedovato@volztmotors.com", password, type: "ADMINISTRATOR" },
      { id: uuid(), name: "Renan Fichberg", email: "renan.fichberg@volztmotors.com", password, type: "ADMINISTRATOR" },
      { id: uuid(), name: "Leonardo Santos", email: "leonardo.santos@volztmotors.com", password, type: "ADMINISTRATOR" },
      { id: uuid(), name: "Roger Komesu", email: "roger.komesu@volztmotors.com", password, type: "VIEWER" },
      { id: uuid(), name: "Alexandre Lot", email: "alexandre.lot@volztmotors.com", password, type: "VIEWER" },
    ]))
}