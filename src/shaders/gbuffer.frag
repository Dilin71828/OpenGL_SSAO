#version 330 core
layout (location = 0) out vec3 viewPos;
layout (location = 1) out vec3 viewNormal;
layout (location = 2) out vec3 albedo;

in vec3 viewSpacePosition;
in vec2 texCoords;
in vec3 viewSpaceNormal;

uniform sampler2D mainTexture;

void main()
{
    viewPos = viewSpacePosition;
    viewNormal = viewSpaceNormal;
    albedo = texture(mainTexture, texCoords).rgb;
}