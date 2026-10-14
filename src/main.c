#define STRLEN 81

char* modifyString(char* inputString) {
    static char outputString[82];

    for (unsigned int i = 0; i < STRLEN; i++) {
        if (inputString[i] == '9')
            outputString[i] = '0';
        else
            outputString[i] = inputString[i] + 1; 
    }

    outputString[STRLEN] = '\0';

    return outputString;
}