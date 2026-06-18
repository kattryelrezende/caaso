// js/services/crudService.js
import { pautas } from '../data/pautas.js';
import { produtos } from '../data/produtos.js';
import { noticias } from '../data/noticias.js';
import { memoria } from '../data/memoria.js';
import { historico } from '../data/historico.js';
import { conquistas } from '../data/conquistas.js';

// Mapeamento de coleções
const collections = {
    pauta: pautas,
    produto: produtos,
    noticia: noticias,
    memoria: memoria,
    historico: historico,
    conquista: conquistas,
    // carta será tratada separadamente
};

export function getCollection(tipo) {
    return collections[tipo] || null;
}

export function findById(tipo, id) {
    const coll = getCollection(tipo);
    if (!coll) return null;
    return coll.find(item => item.id === id) || null;
}

export function addItem(tipo, dados) {
    const coll = getCollection(tipo);
    if (!coll) return null;
    const nextId = coll.length ? Math.max(...coll.map(i => i.id)) + 1 : 1;
    const novo = { id: nextId, ...dados };
    coll.push(novo);
    return novo;
}

export function updateItem(tipo, id, dados) {
    const coll = getCollection(tipo);
    if (!coll) return null;
    const index = coll.findIndex(item => item.id === id);
    if (index === -1) return null;
    coll[index] = { id, ...dados };
    return coll[index];
}

export function deleteItem(tipo, id) {
    const coll = getCollection(tipo);
    if (!coll) return false;
    const index = coll.findIndex(item => item.id === id);
    if (index === -1) return false;
    coll.splice(index, 1);
    return true;
}

// Coleção especial para carta (único registro)
let carta = [{ id: 1, titulo: "CARTA VIVE! 2026", texto: "Assumimos a gestão com compromisso..." }];

export function getCarta() {
    return carta[0] || null;
}

export function updateCarta(dados) {
    if (carta.length === 0) {
        carta.push({ id: 1, ...dados });
    } else {
        carta[0] = { id: 1, ...dados };
    }
    return carta[0];
}