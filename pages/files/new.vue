<template>
  <b-container class="container-fluid">
    <b-row>
      <b-col>
        <b-form id="fileForm" @submit.prevent="onSubmit">
          <b-form-group
            id="file-group"
            label="File:"
            label-for="file"
            description="Warning: Any file with given name that was uploaded before will be overwritten."
          >
            <b-form-file
              v-model="file"
              required
              placeholder="File to upload"
              form="fileForm"
            />
          </b-form-group>
          <b-button type="submit" variant="primary">
            Upload
          </b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  middleware: 'authenticated',
  head() {
    return { title: 'Upload new file' }
  },
  data() {
    return { file: null }
  },
  methods: {
    onSubmit() {
      const formData = new FormData()
      formData.append('file', this.file)

      this.$axios
        .$post('/files/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(response => {
          this.$toast.success('Successfully uploaded the file!', {
            duration: 2000,
          })
        })
        .catch(err => {
          this.$toast.error('Something bad happened when uploading the file.', {
            duration: 2000,
          })
          console.error(err)
        })
    },
  },
}
</script>
