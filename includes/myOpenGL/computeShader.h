#ifndef COMPUTE_SHADER_H
#define COMPUTE_SHADER_H

#include <glad/glad.h>
#include <glm/glm.hpp>

#include <string>
#include <fstream>
#include <sstream>
#include <iostream>

class ComputeShader
{
private:
    GLuint programHandle;

public:
    ComputeShader(const char* shaderFilePath)
    {
        // read shader source code from file
        std::string computeCode;
        std::ifstream computeShaderFile;
        computeShaderFile.exceptions(std::ifstream::failbit | std::ifstream::badbit);

        try
        {
            computeShaderFile.open(shaderFilePath);
            std::stringstream computeShaderStream;
            computeShaderStream << computeShaderFile.rdbuf();
            computeShaderFile.close();
            computeCode = computeShaderStream.str();
        }
        catch(const std::exception& e)
        {
            std::cout << "ERROR::SHADER::FILE_NOT_SUCCESFULLY_READ" << std::endl;
        }
        const char* computeCodeChar = computeCode.c_str();
        
        // compile shader
        GLuint computeShaderHandle = glCreateShader(GL_COMPUTE_SHADER);
        glShaderSource(computeShaderHandle, 1, &computeCodeChar, NULL);
        glCompileShader(computeShaderHandle);
        
    }
};

#endif