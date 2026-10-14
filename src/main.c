#define STRLEN 81

char* solveSudoku(char* inputString) {
    static char outputString[82];

    for (unsigned int i = 0; i < STRLEN; i++) {
        if (inputString[i] == '9')
            outputString[i] = '0';
        else if (inputString[i] == '.')
            outputString[i] = '-';
        else
            outputString[i] = inputString[i] + 1; 
    }

    outputString[STRLEN] = '\0';

    return outputString;
}