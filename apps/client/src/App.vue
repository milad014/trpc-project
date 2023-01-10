<template>
    <div class="container mx-auto" v-if="data">
        {{ data }}

        <div>
            posts
            {{ posts }}
        </div>

        <div @click="createPost">click</div>
    </div>
</template>

<script setup lang="ts">
import { useCreatePost, useHello, usePosts } from './Queries'
const { data } = useHello('test')
const { posts } = usePosts()
const createPost = useCreatePost()
</script>
