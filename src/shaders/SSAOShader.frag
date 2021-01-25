#version 330 core
in vec2 TexCoords;

out float FragColor;

uniform sampler2D depthMap;
uniform sampler2D normalMap;
uniform sampler2D viewPosMap;
uniform sampler2D sampleKernelMap;
uniform sampler2D noiseMap;

uniform float noiseScale;
uniform float radius;
uniform mat4 projection;

#define MAX_SAMPLE 8

void main()
{
    vec3 viewSpacePos = texture(viewPosMap, TexCoords).xyz;
    vec3 normal = texture(normalMap, TexCoords).xyz;     // view space normal
    vec3 noise = texture(noiseMap, TexCoords * noiseScale).xyz;

    vec3 tangent = normalize(noise - normal * dot(normal, noise));
    vec3 bitangent = cross(normal, tangent);
    mat3 TBN = transpose(mat3(tangent, bitangent, normal));

    vec3 samplePos = vec3(0, 0, 0);
    float occlusion = 0;

    for (int i=0; i<MAX_SAMPLE; i++)
    {
        vec3 offsetTangentSpace = texelFetch(sampleKernelMap, ivec2(i, 0), 0).xyz;
        vec3 offsetViewSpace = (TBN * offsetTangentSpace) * radius;

        samplePos = viewSpacePos + offsetViewSpace;

        vec4 targetPos = vec4(samplePos, 1.0);
        targetPos = projection * targetPos;
        targetPos.xyz = targetPos.xyz/targetPos.w;
        targetPos.xyz = targetPos.xyz * 0.5 + 0.5;

        float sampleDepth = texture(viewPosMap, targetPos.xy).z;

        float rangeCheck = smoothstep(0.0, 1.0, radius/abs(viewSpacePos.z - sampleDepth));
        occlusion += (sampleDepth >= samplePos.z + 0.01 ? 1.0 : 0.0) * rangeCheck;
    }

    occlusion=1-occlusion/MAX_SAMPLE;
    FragColor = occlusion;
}