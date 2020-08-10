#version 330 core
layout (location = 0) in vec3 aPos;
layout (location = 1) in vec2 aTexCoords;
layout (location = 2) in vec3 aNormal;

out vec3 viewSpacePosition;
out vec2 texCoords;
out vec3 viewSpaceNormal;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

void main()
{
    viewPosition = view * model * vec4(aPos, 1.0);
    viewSpacePosition = vec3(viewPosition);
    TexCoords = aTexCoords;
    viewSpaceNormal = mat3(transpose(inverse(view * model)))*normal;
    gl_Position = projection * viewPosition;
}