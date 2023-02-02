#include <stdio.h>
#include <stdlib.h>

#include "crypt.h"
#include "utils_v1.h"

int main()
{
	printf("Entre message a decrypter");
	char* msg = readLine();
	char* decryptedMsg = decrypt(msg);
	printf("%s\n", msg);
	printf("%s", decryptedMsg);
	free(msg);
	free(decryptedMsg);
}