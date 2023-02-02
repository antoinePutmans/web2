CFLAGS=-std=c11 -pedantic -Wall -Wvla -Wno-unused-variable -Werror -D_DEFAULT_SOURCE

all : encrypt decrypt

encrypt : crypt.o encrypt.o utils_v1.o
	cc $(CFLAGS) -o encrypt crypt.o encrypt.o utils_v1.o

decrypt : crypt.o decrypt.o utils_v1.o
	cc $(CFLAGS) -o decrypt crypt.o decrypt.o utils_v1.o

utils_v1.o : utils_v1.c utils_v1.h
	cc $(CFLAGS) -c utils_v1.c

crypt.o : crypt.c crypt.h
	cc $(CFLAGS) -c crypt.c

decrypt.o : decrypt.c crypt.h utils_v1.h
	cc $(CFLAGS) -c decrypt.c

encrypt.o : encrypt.c crypt.h utils_v1.h
	cc $(CFLAGS) -c encrypt.c

clean :
	rm *.o
	rm encrypt
	rm decrypt 
