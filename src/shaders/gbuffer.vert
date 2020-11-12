#version 330 core
layout (location = 0) in vec3 aPos;
layout (location = 1) in vec3 aNormal;
layout (location = 2) in vec2 aTexCoords;

out vec3 viewSpacePosition;
out vec2 texCoords;
out vec3 viewSpaceNormal;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

void main()
{
    vec4 viewPosition = view * model * vec4(aPos, 1.0);
    viewSpacePosition = vec3(viewPosition);
    texCoords = aTexCoords;
    viewSpaceNormal = mat3(transpose(inverse(view * model)))*aNormal;
    gl_Position = projection * viewPosition;
}