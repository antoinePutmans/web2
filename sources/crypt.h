#ifndef _CRYPT_H_
#define _CRYPT_H_

/**
 *  PRE: msg: tableau de char
 * 	POST: msg n'est pas modifié
 * 	RES: le message encrypté
 * */
char* encrypt (char* msg);

/**
 *  PRE: msg: tableau de char
 * 	POST: msg n'est pas modifié
 * 	RES: le message décrypté
 * */
char* decrypt (char* msg);

#endif