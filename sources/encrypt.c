#include <stdio.h>
#include <stdlib.h>

#include "crypt.h"
#include "utils_v1.h"

int main()
{
	printf("Entre message a crypter");
	char* msg = readLine();
	char* encryptedMsg = encrypt(msg);
	printf("%s\n", msg);
	printf("%s", encryptedMsg);
	free(msg);
	free(encryptedMsg);
}