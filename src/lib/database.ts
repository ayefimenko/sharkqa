import { supabase, createServerClient } from './supabase'
import type { User, Course, LearningPath, Enrollment } from '../types'

export class UserService {
  static async getProfile(userId: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('Error fetching profile:', error)
      return null
    }

    return data as User
  }

  static async getUsers(role?: string): Promise<User[]> {
    let query = supabase.from('profiles').select('*')
    
    if (role) {
      query = query.eq('role', role)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching users:', error)
      return []
    }

    return data as User[]
  }
}

export class CourseService {
  static async getCourses(): Promise<Course[]> {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching courses:', error)
      return []
    }

    return data as Course[]
  }

  static async getCourse(courseId: string): Promise<Course | null> {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', courseId)
      .single()

    if (error) {
      console.error('Error fetching course:', error)
      return null
    }

    return data as Course
  }
}

export class PathService {
  static async getPaths(): Promise<LearningPath[]> {
    const { data, error } = await supabase
      .from('learning_paths')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching paths:', error)
      return []
    }

    return data as LearningPath[]
  }
}

export class EnrollmentService {
  static async enrollStudent(studentId: string, pathId: string): Promise<Enrollment | null> {
    const { data, error } = await supabase
      .from('enrollments')
      .insert({
        student_id: studentId,
        path_id: pathId,
        progress_percentage: 0
      })
      .select()
      .single()

    if (error) {
      console.error('Error enrolling student:', error)
      return null
    }

    return data as Enrollment
  }
}
