<template>
  <div class="wrapper">
    <ul class="pagination">
      <li class="pagination-item">
        <button
          type="button"
          @click="onClickFirstPage"
          :disabled="isInFirstPage"
        >
          &laquo;
        </button>
      </li>
      <li class="pagination-item">
        <button
          type="button"
          @click="onClickPreviousPage"
          :disabled="isInFirstPage"
        >
          &lt;
        </button>
      </li>
      <!-- NUMBER BUTTON START -->
      <li v-for="page in pages" :key="page.name" class="pagination-item">
        <button
          type="button"
          @click="onClickPage(page.name)"
          :disabled="page.isDisabled"
          class="{ active: isPageActive(page.name) }"
        >
          {{ page.name }}
        </button>
      </li>
      <!-- NUMBER BUTTON END -->
      <li class="pagination-item">
        <button type="button" @click="onClickNextPage" :disabled="isInLastPage">
          &gt;
        </button>
      </li>

      <li class="pagination-item">
        <button type="button" @click="onClickLastPage" :disabled="isInLastPage">
          &raquo;
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
/* 
  Reusable Pagination UI component built following a tutorial

  AUTHOR: Filipa Lacerda
  LINK: https://www.digitalocean.com/community/tutorials/vuejs-vue-pagination-component

  ACCESSED: 06-14-2022

*/
export default {
  computed: {
    startPage() {
      // When on first page
      if (this.currentPage === 1) {
        return 1;
      }
      // When on last page
      if (this.currentPage === this.totalPages) {
        return this.totalPages - (this.maxVisibleButtons - 1);
      }

      // When inbetween
      return this.currentPage - 1;
    },
    pages() {
      const range = [];
      for (
        let i = this.startPage;
        i <=
        Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
        i++
      ) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage,
        });
      }
      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
  },
  methods: {
    onClickFirstPage() {
      this.$emit("pagechanged", 1);
    },
    onClickPreviousPage() {
      this.$emit("pagechanged", this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit("pagechanged", page);
    },
    onClickNextPage() {
      this.$emit("pagechanged", this.currentPage + 1);
    },
    onClickLastPage() {
      this.$emit("pagechanged", this.totalPages);
    },
    isPageActive(page) {
      return this.currentPage === page;
    },
  },
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
.wrapper {
  text-align: center;
}
.pagination {
  list-style-type: none;
}

.pagination-item {
  display: inline-block;
  border: none;
}

.active {
  background-color: #4aae9b;
  color: #ffffff;
}
button {
  cursor: pointer;
  padding: 0.5rem;
  border: none;
  margin: 0.1rem;
  font-size: 1rem;
  border-radius: 0.2rem;
  background-color: #6441a5;
  color: azure;
}
button:hover {
  background-color: #0e9dd9;
  flex-grow: 1rem;
}
</style>